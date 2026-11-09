"""
Evaluation Visualization Generator for CareerPath AI
Produces high-resolution evaluation charts for:
1. Multi-model comparative bar chart (Accuracy, Macro Precision, Macro Recall, Macro F1) across 5 algorithms
2. Confusion matrix heatmaps for all 5 candidate models
Saves figures into backend/static/eval_plots/
"""

import os
import sys
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

MODELS_DIR = os.path.join(BASE_DIR, 'models')
EVAL_FILE = os.path.join(MODELS_DIR, 'evaluation_results.json')
PLOTS_DIR = os.path.join(BASE_DIR, 'backend', 'static', 'eval_plots')

def generate_evaluation_visualizations():
    os.makedirs(PLOTS_DIR, exist_ok=True)
    with open(EVAL_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    models_data = data['models']
    classes = data['classes']
    
    # Shorten class names for readability in confusion matrices
    short_classes = [
        c.replace(" & Systems Architecture", "")
         .replace(" & DevOps Engineering", "")
         .replace(" & Information Security", "")
         .replace(" & Business Intelligence", "")
         .replace(" & Machine Learning", "")
         .replace(" & IT Project Management", " Mgmt")
         .replace(" & Frontend Systems", "")
        for c in classes
    ]
    
    # -------------------------------------------------------------
    # 1. Model Comparison Bar Chart (5 Models)
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(12, 6))
    model_names = list(models_data.keys())
    x = np.arange(len(model_names))
    width = 0.18
    
    accs = [models_data[m]['accuracy'] * 100 for m in model_names]
    precs = [models_data[m]['precision_macro'] * 100 for m in model_names]
    recs = [models_data[m]['recall_macro'] * 100 for m in model_names]
    f1s = [models_data[m]['f1_macro'] * 100 for m in model_names]
    
    ax.bar(x - 1.5*width, accs, width, label='Accuracy', color='#3b82f6')
    ax.bar(x - 0.5*width, precs, width, label='Precision (Macro)', color='#10b981')
    ax.bar(x + 0.5*width, recs, width, label='Recall (Macro)', color='#f59e0b')
    ax.bar(x + 1.5*width, f1s, width, label='F1-Score (Macro)', color='#8b5cf6')
    
    ax.set_ylabel('Score (%)', fontsize=12, fontweight='bold')
    ax.set_title('CareerPath ML Model Benchmark: 5 Supervised Classifiers (Untouched Test Set)', fontsize=13, fontweight='bold', pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(model_names, fontsize=10, fontweight='semibold')
    ax.set_ylim(60, 105)
    ax.grid(axis='y', linestyle='--', alpha=0.4)
    ax.legend(frameon=True, loc='lower right', fontsize=10)
    
    # Value annotations on top of F1 bars
    for i, v in enumerate(f1s):
        ax.text(x[i] + 1.5*width, v + 0.8, f"{v:.1f}%", ha='center', va='bottom', fontsize=8.5, fontweight='bold')
        
    plt.tight_layout()
    comp_plot_path = os.path.join(PLOTS_DIR, 'model_comparison.png')
    plt.savefig(comp_plot_path, dpi=200)
    plt.close()
    print(f"Saved comparison plot to: {comp_plot_path}")
    
    # -------------------------------------------------------------
    # 2. Confusion Matrices for Each Model (All 5)
    # -------------------------------------------------------------
    for name, mdata in models_data.items():
        cm = np.array(mdata['confusion_matrix'])
        fig, ax = plt.subplots(figsize=(9, 8))
        
        sns.heatmap(
            cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=short_classes, yticklabels=short_classes,
            cbar=False, ax=ax, annot_kws={"size": 11, "weight": "bold"}
        )
        ax.set_title(f'Confusion Matrix — {name} (Test Acc: {mdata["accuracy"]*100:.1f}%)', fontsize=13, fontweight='bold', pad=12)
        ax.set_xlabel('Predicted Career Domain', fontsize=11, fontweight='bold')
        ax.set_ylabel('True Career Domain', fontsize=11, fontweight='bold')
        plt.xticks(rotation=40, ha='right', fontsize=9)
        plt.yticks(rotation=0, fontsize=9)
        plt.tight_layout()
        
        slug = name.lower().replace(" ", "_").replace("-", "_")
        cm_path = os.path.join(PLOTS_DIR, f'confusion_matrix_{slug}.png')
        plt.savefig(cm_path, dpi=200)
        plt.close()
        print(f"Saved confusion matrix for {name} to: {cm_path}")
        
    print("All evaluation plots generated successfully!")

if __name__ == '__main__':
    generate_evaluation_visualizations()
