# 🧠 NeuralScent — AffectAI

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />
  <img src="https://img.shields.io/badge/Keras-D00000?style=for-the-badge&logo=keras&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Deep%20Learning-NLP-blueviolet?style=for-the-badge" />
</p>

<p align="center">
  <strong>Understanding the emotions behind every sentence.</strong>
</p>

<p align="center">
  NeuralScent — AffectAI is an end-to-end Deep Learning application designed to recognize human emotions from textual input using Natural Language Processing (NLP) and Recurrent Neural Network architectures.
</p>

---

## ✨ Overview

**NeuralScent — AffectAI** ### 
**AI-Powered Emotion Recognition & Intelligence Platform**

NeuralScent is a Deep Learning and Natural Language Processing project designed to identify emotions expressed in textual communication. Built using an Advanced Stacked Bidirectional GRU architecture, the system classifies written input into six emotion categories and generates probability-based predictions through a FastAPI backend.

The project explores how emotion recognition can be applied to customer experience intelligence, feedback analytics, social media research and textual communication analysis. Its interactive intelligence dashboard transforms individual model predictions into visual insights, probability distributions and analytical reports.

**Technologies:** Python, TensorFlow, Keras, NLP, BiGRU, FastAPI, NumPy, JavaScript and Data Visualization.

## 🎯 Emotion Categories

The model recognizes six emotion categories:

| Emotion | Representation |
|---|---|
| Joy | 😄 |
| Sadness | 😢 |
| Love | ❤️ |
| Anger | 😠 |
| Fear | 😨 |
| Surprise | 😲 |

## 🚀 Key Features

- **Multi-class Emotion Classification:** Identifies six different emotions from textual input.
- **Deep Learning Model Comparison:** Explores RNN, LSTM, and GRU architectures.
- **Bidirectional GRU:** Uses contextual information from both directions of a sequence.
- **Text Preprocessing:** Cleans and standardizes input before prediction.
- **Real-time Predictions:** Generates predictions through a FastAPI REST API.
- **Confidence Scores:** Returns the predicted emotion and probability distribution across all six categories.
- **Interactive Web Interface:** Allows users to analyze text through a browser.
- **API Health Monitoring:** Includes an endpoint to check server and model availability.

## 🧠 Model Architecture

The project follows a deep learning pipeline:

```text
          User Input
               |
               v
        Text Preprocessing
               |
               v
       Tokenization
               |
               v
       Sequence Padding
               |
               v
      Stacked BiGRU Model
               |
               v
      Emotion Classification
               |
               v
       Probability Scores
               |
               v
       Predicted Emotion
```

### Model Exploration

| Architecture | Description |
|---|---|
| RNN | Processes sequential text data |
| LSTM | Captures longer-term dependencies |
| GRU | Uses gated mechanisms to learn sequential patterns |
| Stacked BiGRU | Processes contextual information in both directions using stacked GRU layers |

**Final Model:** Advanced Stacked Bidirectional GRU.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| TensorFlow | Deep learning framework |
| Keras | Neural network development |
| NumPy | Numerical computations |
| NLP | Text processing |
| FastAPI | REST API development |
| Pydantic | Request and response validation |
| Uvicorn | ASGI server |
| HTML, CSS, JavaScript | Web interface |

## 📂 Project Structure

```text
NeuralScent-AffectAI/
│
├── Artifacts/
│   ├── BiGRU_Model.keras
│   └── tokenizer.pkl
│
├── Desktop/
│
├── static/
│   └── index.html
│
├── final_clean.ipynb
│
├── main.py
│
├── requirements.txt
│
├── runtime.txt
│
└── README.md
```

### Important Files

- `final_clean.ipynb` — Model development, experimentation, and analysis.
- `main.py` — FastAPI application and prediction pipeline.
- `Artifacts/` — Stores the trained BiGRU model and tokenizer.
- `static/` — Contains the web interface.
- `requirements.txt` — Python dependencies.
- `runtime.txt` — Runtime configuration.

## ⚙️ Installation & Setup

Follow these steps to run NeuralScent locally.

### 1. Clone the repository

```bash
git clone https://github.com/Ozo-Casca/NeuralScent-AffectAI.git
```

### 2. Navigate to the project directory

```bash
cd NeuralScent-AffectAI
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

Activate it:

**Windows:**
```bash
venv\Scripts\activate
```

**Linux / macOS:**
```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the application

```bash
uvicorn main:app --reload
```

### 6. Open the application

Visit:

```text
http://127.0.0.1:8000
```

The interactive web interface should now be available.

## 🔌 API Documentation

NeuralScent uses FastAPI to expose its emotion prediction functionality.

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Opens the web interface |
| GET | `/health` | Checks server and model status |
| POST | `/predict` | Predicts emotion from text |
| GET | `/docs` | Interactive API documentation |

### Example Prediction Request

**Endpoint:**

```http
POST /predict
```

**Request Body:**

```json
{
  "text": "I am feeling incredibly happy today!"
}
```

**Example Response Structure:**

```json
{
  "text": "I am feeling incredibly happy today!",
  "predicted_emotion": "joy",
  "confidence": 0.95,
  "all_probabilites": {
    "sadness": 0.01,
    "joy": 0.95,
    "love": 0.01,
    "anger": 0.01,
    "fear": 0.01,
    "surprise": 0.01
  }
}
```

*Note: The probability values above are illustrative, not measured model results.*

## 🔍 How It Works

1. **Input:** The user enters a sentence through the web interface.
2. **Preprocessing:** Text is converted to lowercase, punctuation and special characters are handled, and extra spaces are removed.
3. **Tokenization:** Words are converted into numerical sequences using the trained tokenizer.
4. **Padding:** Sequences are padded to a fixed length of 50.
5. **Prediction:** The trained BiGRU model processes the sequence.
6. **Classification:** The model identifies the emotion with the highest predicted probability.
7. **Output:** The application returns the predicted emotion and probability distribution.

## 🎓 Learning Outcomes

This project explores practical implementation of:

- Natural Language Processing (NLP).
- Recurrent Neural Networks.
- LSTM and GRU architectures.
- Bidirectional deep learning models.
- Text preprocessing and tokenization.
- Multi-class classification.
- Model serialization and deployment.
- REST API development using FastAPI.
- Integration of machine learning models with web applications.

## 🔮 Future Improvements

- Expand emotion recognition with more diverse datasets.
- Experiment with Transformer-based architectures.
- Improve model evaluation and performance benchmarking.
- Add multilingual emotion classification.
- Introduce model explainability and interpretability.
- Enhance the user interface with interactive visualizations.
- Explore real-time conversational emotion analysis.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

If you have ideas to improve NeuralScent — AffectAI, feel free to fork the repository and submit a pull request.


<p align="center">
  <strong>NeuralScent — AffectAI</strong>
  <br/>
  Turning words into emotional insights.
  <br/><br/>
  Made with ❤️ and Deep Learning.
</p>
