export const TOUR_STEPS = [
  {
    target: '.tour-problem',
    content: 'こちらが問題です',
    disableBeacon: true,
    hideCloseButton:true,
  },
  {
    target: '.tour-output',
    content: 'プロンプトから返ってくるレスポンスのフォーマット形式です',
  },
  {
    target: '.tour-system-prompt',
    content: 'システムプロンプトは、AI対して特定の会話スタイルや行動を指示するヒントです。',
  },
  {
    target: '.tour-input-prompt',
    content: 'プロンプトが入力できます。',
  },
  {
    target: '.tour-evaluate-prompt',
    content: '現在のプロンプトを採点します。',
  },
  {
    target: '.tour-evaluate-prompt-point',
    content: '現在のプロンプトを得点です。',
  },
  {
    target: '.tour-create-new-chat',
    content: '新しいチャットを作成します。',
  },
  {
    target: '.tour-submission-prompt',
    content: '現在のプロンプトで提出し、問題を終了します。',
  },
];


export const ACTIVE_STEPS = [
  {
    target: '.tour-active-prompt',
    content: (
      <>
        <p>プロンプトを入力してみよう。</p>
        <p>「私は人間として返してください」と入力してみよう</p>
      </>
    )  as React.ReactNode,
    disableBeacon: false,
  },
  {
    target: '.tour-active-evaluation',
    content: (
      <>
        <p>プロンプトと採点してみよう。</p>
        <p>「採点する」をクリックしてみよう</p>
      </>
    )  as React.ReactNode,
    disableBeacon: false,
  },
  {
    target: '.tour-active-submission',
    content: (
      <>
        <p>採点したプロンプトと提出してみよう。</p>
        <p>「提出して完了する」をクリックしてみよう</p>
      </>
    )  as React.ReactNode,
    disableBeacon: false,
  },
];