BEGIN;

INSERT INTO users VALUES
  (1, 'Ben', 'a@example.com', '$2a$12$A74tKw96m82AEZpJrIEQxecZGscKayJD/hD5/I6DuqKEJoQlAlNYO1', '2017-12-25 00:00:00'),
  (2, 'Sara', 'b@example.com', '$2a$12$o2NP8ykiki.T11qRQOCnBeX68PhwXHprM/hxHkbAfqotWo2XT.vdW2', '2017-12-25 00:00:00'),
  (3, 'Barry', 'c@example.com', '$2a$12$8HIQ9kqN0brBUfDigfSfB.9BlSsICw4LQ/tiw4U/zMW5QWtuTqMG63', '2017-12-25 00:00:00'),
  (4, 'Fin', 'd@example.com', '$2a$12$vpUb03L0WVHMfrHducL2SumogekzuPfh9Ych0Il8Zkt5Baqch7QZq4', '2017-12-25 00:00:00'),
  (5, 'Zack', 'e@example.com', '$2a$12$vpUb03L0WVHMfrHducL2SumogekzuPfh9Ych0Il8Zkt5Baqch7QZq5', '2017-12-25 00:00:00')
ON CONFLICT DO NOTHING;

INSERT INTO actions VALUES
  (1, 'Working out', 1, 'go', '2020-09-24 22:00:00', 0),
  (2, 'Getting irritated easily', 3, 'stop', '2019-05-24 22:00:00', 0),
  (3, 'Procrastinating', 2, 'stop', '2018-07-09 22:00:00', 0),
  (4, 'Taking every thing personally', 4, 'stop', '2019-04-26 22:00:00', 0),
  (5, 'Having fun', 4, 'go', '2019-04-26 22:00:00', 0),
  (6, 'Work hard', 5, 'go', '2019-04-26 22:00:00', 0)
ON CONFLICT DO NOTHING;

COMMIT;