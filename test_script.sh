#!/bin/bash

# 正しい回答を提出します
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "problem_id": "1",
    "content": "2"
}'

# 間違った回答を提出します
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "problem_id": "1",
    "content": "wrong answer"
}'

# gradedOneCaseByChatGPT problem type の問題に対するテスト用の curl コマンドです
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "problem_id": "2",
    "content": "二郎系ラーメン屋の店長さんみたいですね。"
}'

curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
  "user_id": "1",
  "problem_id": "3",
  "system_prompt": "",
  "content": " Given a document from a user, try to extract the following metadata:\n - minimum_monthly_salary: number or null\n - maximum_monthly_salary: number or null\n\nexample input1: 年棒240万円以上\nexample output1: {minimum_monthly_salary: 200000, maximum_monthly_salary:null}\n\n Respond with a JSON containing the extracted metadata in key value pairs. If you dont find a metadata field, dont specify it.\n ONLY JSON is accepted as a response."
}'
