"""
Live Predictor Unit Tests
CareerPath AI Platform
"""
import unittest
from ml_engine.predictor import get_predictor

class TestLivePredictor(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.predictor = get_predictor()

    def test_predictor_basic_inference(self):
        test_ratings = {
            'math_interest': 4,
            'programming_interest': 5,
            'creativity_design_interest': 2,
            'social_communication_interest': 2,
            'data_analysis_interest': 3,
            'problem_solving_interest': 5,
            'leadership_management_interest': 2
        }
        test_text = "I love writing clean code in Python and building scalable web applications and REST APIs."
        res = self.predictor.predict(test_ratings, test_text, top_k=3)
        
        self.assertIn("top_recommendations", res)
        self.assertEqual(len(res["top_recommendations"]), 3)
        
        top = res["top_recommendations"][0]
        self.assertIn("domain_name", top)
        self.assertIn("match_score", top)
        self.assertIn("onet_soc_code", top)
        self.assertIn("explanation", top)
        self.assertIn("learning_stages", top)
        self.assertIn("curated_roadmap", top)
        self.assertIn("portfolio_projects", top)
        self.assertIn("learning_resources", top)
        self.assertTrue(len(top["top_skills"]) > 0)
        self.assertTrue(len(top["hot_technologies"]) > 0)

    def test_all_models_inference(self):
        test_ratings = {
            'math_interest': 3,
            'programming_interest': 3,
            'creativity_design_interest': 3,
            'social_communication_interest': 3,
            'data_analysis_interest': 3,
            'problem_solving_interest': 3,
            'leadership_management_interest': 3
        }
        for model_name in ["Random Forest", "Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Naive Bayes"]:
            res = self.predictor.predict(test_ratings, "testing software systems", model_name=model_name, top_k=3)
            self.assertEqual(len(res["top_recommendations"]), 3)
            self.assertEqual(res["model_used"], model_name)

if __name__ == "__main__":
    unittest.main()
