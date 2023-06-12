#!/bin/bash

# 正しい回答を提出します
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "competition_id": 1,
    "problem_id": 1,
    "content": {
      "id": "1",
      "name": "sample",
      "messages": [
        {"role": "user", "content": "2"}
      ],
      "prompt": "あなたは優れたアシスタントです",
      "temperature": 0,
      "folderId": "1"
    }
}'

# 間違った回答を提出します
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "competition_id": 1,
    "problem_id": 1,
    "content": {
      "id": "1",
      "name": "sample",
      "messages": [
        {"role": "user", "content": "wrong answer"}
      ],
      "prompt": "あなたは優れたアシスタントです",
      "temperature": 0,
      "folderId": "1"
    }
}'

# gradedOneCaseByChatGPT problem type の問題に対する挙動確認用の curl コマンドです
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "competition_id": 1,
    "problem_id": 2,
    "content": {
      "id": "1",
      "name": "sample",
      "messages": [
        {"role": "user", "content": "二郎系ラーメン屋の店長さんみたいですね。"}
      ],
      "model": {
        "id": "1",
        "name": "gpt-3.5-turbo",
        "maxLength": 1000,
        "tokenLimit": 2000
      },
      "prompt": "あなたは優れたアシスタントです",
      "temperature": 0,
      "folderId": "1"
    }
}'

# gradedMultipleCaseUsingChatGPT problem type の問題に対する挙動確認用の curl コマンドです
curl -X POST 'http://localhost:3000/api/competitions/1/submissions' \
-H 'Content-Type: application/json' \
-d '{
    "user_id": "1",
    "competition_id": 1,
    "problem_id": 3,
    "content": {
      "id": "1",
      "name": "sample",
      "messages": [
        {"role": "user", "content": "Given a document from a user, try to extract the following metadata:\n - minimum_monthly_salary: number or null\n - maximum_monthly_salary: number or null\n\nexample input1: 年棒240万円以上\nexample output1: {minimum_monthly_salary: 200000, maximum_monthly_salary:null}\n\n Respond with a JSON containing the extracted metadata in key value pairs. If you dont find a metadata field, dont specify it.\n ONLY JSON is accepted as a response."}
      ],
      "model": {
        "id": "1",
        "name": "gpt-3.5-turbo",
        "maxLength": 1000,
        "tokenLimit": 2000
      },
      "prompt": "あなたは優れたアシスタントです",
      "temperature": 0,
      "folderId": "1"
    }
}'

# # gradedMultipleCaseUsingChatGPT problem type の問題に対するテスト用の curl コマンドです
# # 採点結果を submissions.json には出力しません
# curl -X POST 'http://localhost:3000/api/competitions/1/calculation' \
# -H 'Content-Type: application/json' \
# -d '{
#     "user_id": "1",
#     "problem_id": "3",
#     "messages": [
#       {
#         "message_id": "1",
#         "role": "system",
#         "content": "You are a smart assistant."
#       },
#       {
#         "message_id": "2",
#         "role": "user",
#         "content": "Given a document from a user, try to extract the following metadata:\n - minimum_monthly_salary: number or null\n - maximum_monthly_salary: number or null\n\nexample input1: 年棒240万円以上\nexample output1: {minimum_monthly_salary: 200000, maximum_monthly_salary:null}\n\n Respond with a JSON containing the extracted metadata in key value pairs. If you dont find a metadata field, dont specify it.\n ONLY JSON is accepted as a response."
#       }
#     ]
# }'
