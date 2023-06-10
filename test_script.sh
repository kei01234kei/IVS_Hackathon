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
