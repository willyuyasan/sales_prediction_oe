USE forms;

CREATE TABLE IF NOT EXISTS sales_prediction (
    date TEXT NOT NULL,
    Store TEXT NOT NULL,
    q_predicted VARCHAR(250) NOT NULL,
    prediction_datetime TEXT NOT NULL  
);
