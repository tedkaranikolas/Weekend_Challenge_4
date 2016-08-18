CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  chore VARCHAR(30),
  completed BOOLEAN DEFAULT FALSE,
  date_completed DATE
)
