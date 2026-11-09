"""
Comprehensive Test Suite for CareerPath
Tests 5 distinct student profiles as specified in Section 11:
1. Programming-oriented student
2. Mathematics and data-oriented student
3. Creative and design-oriented student
4. Business and communication-oriented student
5. Research and problem-solving-oriented student
Plus Edge Cases:
- Empty text description
- Missing questionnaire answers (defaults)
- Boundary rating values (all 1s, all 5s)
"""

import unittest
from ml_engine.predictor import get_predictor

class TestCareerPathProfiles(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.predictor = get_predictor()

    def test_profile_1_programming_student(self):
        """Profile 1: Programming-oriented student should receive Software or Systems engineering top."""
        ratings = {
            'math_interest': 4,
            'programming_interest': 5,
            'creativity_design_interest': 2,
            'social_communication_interest': 2,
            'data_analysis_interest': 3,
            'problem_solving_interest': 5,
            'leadership_management_interest': 2
        }
        text = "I love developing web applications, writing backend code in Python and Java, and building REST APIs."
        res = self.predictor.predict(ratings, text, top_k=3)
        self.assertEqual(res['status'], 'success')
        self.assertEqual(len(res['top_recommendations']), 3)
        top_domain = res['top_recommendations'][0]['domain_name']
        self.assertIn(top_domain, ['Software Development', 'Cloud & DevOps Engineering'])
        print(f"\n[PASS] Profile 1 (Programming): Top -> {top_domain} ({res['top_recommendations'][0]['match_score']}%)")

    def test_profile_2_math_and_data_student(self):
        """Profile 2: Math and data-oriented student should receive Data Science or Analytics."""
        ratings = {
            'math_interest': 5,
            'programming_interest': 4,
            'creativity_design_interest': 2,
            'social_communication_interest': 2,
            'data_analysis_interest': 5,
            'problem_solving_interest': 5,
            'leadership_management_interest': 2
        }
        text = "I am deeply fascinated by statistics, machine learning algorithms, predictive modeling, and analyzing datasets with Pandas."
        res = self.predictor.predict(ratings, text, top_k=3)
        self.assertEqual(res['status'], 'success')
        top_domain = res['top_recommendations'][0]['domain_name']
        self.assertIn(top_domain, ['Data Science & Machine Learning', 'Data Analytics & Business Intelligence'])
        print(f"[PASS] Profile 2 (Math & Data): Top -> {top_domain} ({res['top_recommendations'][0]['match_score']}%)")

    def test_profile_3_creative_and_design_student(self):
        """Profile 3: Creative & design-oriented student should receive UI/UX Design."""
        ratings = {
            'math_interest': 1,
            'programming_interest': 3,
            'creativity_design_interest': 5,
            'social_communication_interest': 4,
            'data_analysis_interest': 2,
            'problem_solving_interest': 3,
            'leadership_management_interest': 3
        }
        text = "I love creating Figma wireframes, designing intuitive user experiences, typography, and crafting accessible front-end interfaces."
        res = self.predictor.predict(ratings, text, top_k=3)
        self.assertEqual(res['status'], 'success')
        top_domain = res['top_recommendations'][0]['domain_name']
        self.assertEqual(top_domain, 'UI/UX Design & Frontend Systems')
        print(f"[PASS] Profile 3 (Creative/Design): Top -> {top_domain} ({res['top_recommendations'][0]['match_score']}%)")

    def test_profile_4_business_and_communication_student(self):
        """Profile 4: Business and communication student should receive Project Management or Business Analysis."""
        ratings = {
            'math_interest': 2,
            'programming_interest': 2,
            'creativity_design_interest': 3,
            'social_communication_interest': 5,
            'data_analysis_interest': 3,
            'problem_solving_interest': 4,
            'leadership_management_interest': 5
        }
        text = "I excel at leading tech teams, Agile Scrum ceremonies, sprint planning in Jira, stakeholder communication, and product strategy."
        res = self.predictor.predict(ratings, text, top_k=3)
        self.assertEqual(res['status'], 'success')
        top_domain = res['top_recommendations'][0]['domain_name']
        self.assertIn(top_domain, ['Product & IT Project Management', 'Business Analysis & Systems Architecture'])
        print(f"[PASS] Profile 4 (Business/Communication): Top -> {top_domain} ({res['top_recommendations'][0]['match_score']}%)")

    def test_profile_5_research_and_problem_solving_student(self):
        """Profile 5: Research & problem solving student (e.g. Security or Systems)."""
        ratings = {
            'math_interest': 4,
            'programming_interest': 4,
            'creativity_design_interest': 2,
            'social_communication_interest': 2,
            'data_analysis_interest': 4,
            'problem_solving_interest': 5,
            'leadership_management_interest': 3
        }
        text = "I enjoy ethical hacking, analyzing network packets with Wireshark, detecting security vulnerabilities, and system forensics."
        res = self.predictor.predict(ratings, text, top_k=3)
        self.assertEqual(res['status'], 'success')
        top_domain = res['top_recommendations'][0]['domain_name']
        self.assertEqual(top_domain, 'Cybersecurity & Information Security')
        print(f"[PASS] Profile 5 (Cybersecurity/Research): Top -> {top_domain} ({res['top_recommendations'][0]['match_score']}%)")

    def test_edge_case_empty_text(self):
        """Edge Case 1: Empty text description should not crash and rely on ratings."""
        ratings = {
            'math_interest': 5,
            'programming_interest': 5,
            'creativity_design_interest': 1,
            'social_communication_interest': 1,
            'data_analysis_interest': 4,
            'problem_solving_interest': 5,
            'leadership_management_interest': 1
        }
        res = self.predictor.predict(ratings, "", top_k=3)
        self.assertEqual(res['status'], 'success')
        self.assertEqual(len(res['top_recommendations']), 3)
        print(f"[PASS] Edge Case (Empty Text): Handled gracefully, top -> {res['top_recommendations'][0]['domain_name']}")

    def test_edge_case_missing_ratings(self):
        """Edge Case 2: Partial or missing questionnaire keys are defaulted to neutral 3."""
        ratings = {'programming_interest': 5}
        res = self.predictor.predict(ratings, "Coding in python", top_k=3)
        self.assertEqual(res['status'], 'success')
        self.assertEqual(len(res['top_recommendations']), 3)
        print(f"[PASS] Edge Case (Missing Keys): Defaulted gracefully, top -> {res['top_recommendations'][0]['domain_name']}")

    def test_edge_case_boundary_ratings(self):
        """Edge Case 3: All ratings set to 5."""
        ratings = {
            'math_interest': 5,
            'programming_interest': 5,
            'creativity_design_interest': 5,
            'social_communication_interest': 5,
            'data_analysis_interest': 5,
            'problem_solving_interest': 5,
            'leadership_management_interest': 5
        }
        res = self.predictor.predict(ratings, "I love everything in technology.", top_k=5)
        self.assertEqual(res['status'], 'success')
        self.assertEqual(len(res['top_recommendations']), 5)
        print(f"[PASS] Edge Case (All 5s): Top -> {res['top_recommendations'][0]['domain_name']}")

if __name__ == '__main__':
    unittest.main()
