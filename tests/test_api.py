"""
Unit and Integration Tests for CareerPath API
CareerPath AI Platform
"""

import unittest
from backend.api_routes import health_check, get_model_evaluation, get_all_careers, get_career_detail, get_career_recommendation
from backend.schemas import RecommendRequest, RatingsInput, WorkPreferencesInput, CandidateBackgroundInput
from pydantic import ValidationError

class TestCareerPathAPI(unittest.TestCase):
    def test_health_endpoint(self):
        data = health_check()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["service"], "CareerPath Recommendation Engine")
        self.assertIn("classes_supported", data)
        self.assertEqual(len(data["classes_supported"]), 8)
        self.assertEqual(data["classes_count"], 8)
        self.assertIn("algorithms_supported", data)
        self.assertEqual(len(data["algorithms_supported"]), 5)
        self.assertIn("Naive Bayes", data["algorithms_supported"])
        self.assertIn("Random Forest", data["algorithms_supported"])
        self.assertEqual(data["total_features_count"], 307)

    def test_models_endpoint(self):
        data = get_model_evaluation()
        self.assertIn("models", data)
        expected_models = [
            "Random Forest", "Logistic Regression", "K-Nearest Neighbors",
            "Decision Tree", "Naive Bayes"
        ]
        for m in expected_models:
            self.assertIn(m, data["models"], f"Model {m} missing from evaluation results")
            self.assertIn("accuracy", data["models"][m])
            self.assertIn("f1_macro", data["models"][m])
            self.assertIn("confusion_matrix", data["models"][m])
            self.assertIn("cv_validation", data["models"][m])

    def test_careers_endpoint(self):
        careers = get_all_careers()
        self.assertEqual(len(careers), 8)
        self.assertTrue(any(c["domain_name"] == "Software Development" for c in careers))
        for c in careers:
            self.assertIn("domain_name", c)
            self.assertIn("onet_soc_code", c)
            self.assertIn("top_skills", c)
            self.assertIn("hot_technologies", c)

    def test_career_detail_endpoint(self):
        detail = get_career_detail("Software Development")
        self.assertEqual(detail["onet_soc_code"], "15-1252.00")
        self.assertIn("top_skills", detail)
        self.assertIn("top_abilities", detail)
        self.assertIn("top_knowledge", detail)
        self.assertIn("hot_technologies", detail)
        self.assertIn("job_zone", detail)
        self.assertEqual(detail["job_zone"]["zone"], 4)
        self.assertIn("work_activities", detail)
        self.assertIn("portfolio_projects", detail)
        self.assertIn("learning_resources", detail)
        self.assertGreater(len(detail["top_knowledge"]), 0)

    def test_recommend_endpoint_best_model(self):
        payload = RecommendRequest(
            ratings=RatingsInput(
                math_interest=4,
                programming_interest=5,
                creativity_design_interest=2,
                social_communication_interest=2,
                data_analysis_interest=3,
                problem_solving_interest=5,
                leadership_management_interest=2
            ),
            text="I like building REST APIs, writing backend code in Python, and solving algorithms.",
            work_preferences=WorkPreferencesInput(
                work_environment="Collaborative Team",
                task_orientation="Building & Construction",
                learning_style="Project-Based"
            ),
            background=CandidateBackgroundInput(
                education_level="Bachelor's Degree",
                experience_level="Entry-Level / Student",
                declared_skills=["Python", "Git", "SQL"],
                primary_goal="Building Scalable Software"
            ),
            model_name="Best Model",
            top_k=3
        )
        res = get_career_recommendation(payload)
        self.assertEqual(res["status"], "success")
        self.assertEqual(len(res["top_recommendations"]), 3)
        top_rec = res["top_recommendations"][0]
        self.assertEqual(top_rec["domain_name"], "Software Development")
        self.assertIn("explanation", top_rec)
        self.assertIn("narrative", top_rec["explanation"])
        self.assertIn("skill_gap_analysis", top_rec["explanation"])
        self.assertIn("job_zone", top_rec)
        self.assertIn("portfolio_projects", top_rec)
        self.assertIn("learning_resources", top_rec)
        
        # Verify skill gap structure
        gap_data = top_rec["explanation"]["skill_gap_analysis"]
        self.assertIn("strengths", gap_data)
        self.assertIn("gaps", gap_data)
        self.assertIn("priority_technologies_to_learn", gap_data)
        self.assertIn("actionable_steps", gap_data)
        self.assertIn("radar_comparison", res)
        self.assertIn("disclaimer", res)

    def test_recommend_endpoint_naive_bayes(self):
        payload = RecommendRequest(
            ratings=RatingsInput(
                math_interest=5,
                programming_interest=4,
                creativity_design_interest=2,
                social_communication_interest=2,
                data_analysis_interest=5,
                problem_solving_interest=5,
                leadership_management_interest=2
            ),
            text="I love machine learning, deep neural networks, and pandas data science.",
            model_name="Naive Bayes",
            top_k=3
        )
        res = get_career_recommendation(payload)
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["model_used"], "Naive Bayes")
        self.assertEqual(len(res["top_recommendations"]), 3)
        self.assertEqual(res["top_recommendations"][0]["domain_name"], "Data Science & Machine Learning")

    def test_input_validation(self):
        with self.assertRaises(ValidationError):
            RatingsInput(
                math_interest=6.5,  # Out of bounds (>5)
                programming_interest=5,
                creativity_design_interest=2,
                social_communication_interest=2,
                data_analysis_interest=3,
                problem_solving_interest=5,
                leadership_management_interest=2
            )

    def test_recommend_endpoint_empty_and_default_payloads(self):
        # Empty payload
        req_empty = RecommendRequest.model_validate({})
        res_empty = get_career_recommendation(req_empty)
        self.assertEqual(res_empty["status"], "success")
        self.assertEqual(len(res_empty["top_recommendations"]), 3)

        # Payload with 0 ratings (should default safely rather than crash)
        req_zero = RecommendRequest.model_validate({"ratings": {"math_interest": 0, "programming_interest": 0}})
        res_zero = get_career_recommendation(req_zero)
        self.assertEqual(res_zero["status"], "success")
        self.assertEqual(len(res_zero["top_recommendations"]), 3)

        # Payload with null text
        req_null_text = RecommendRequest.model_validate({"text": None})
        res_null_text = get_career_recommendation(req_null_text)
        self.assertEqual(res_null_text["status"], "success")

if __name__ == '__main__':
    unittest.main()
