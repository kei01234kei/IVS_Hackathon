export const TOUR_STEPS = [
  {
    target: '.tour-problem',
    content: 'こちらが問題です',
    disableBeacon: true,
    hideCloseButton:true,
  },
  {
    target: '.tour-output',
    content: (
      <>
        <p>AIから返ってくるレスポンスのフォーマット形式です</p>
      </>
    )  as React.ReactNode,
  },
  {
    target: '.tour-system-prompt',
    content: (
      <>
        <p>システムプロンプを入力することができます。</p>
        <p>システムプロンプトは、AI対して特定の会話スタイルや行動を指示するヒントです。</p>
      </>
    )  as React.ReactNode,
  },
  {
    target: '.tour-input-prompt',
    content: (
      <>
        <p>プロンプトを入力できます。</p>
        <p>プロンプトでは、AIに指示や要求することができます。</p>
        <p>プロンプトを送信することによってAIからレスポンスを得ることができます</p>
      </>
    )  as React.ReactNode,
  },
  {
    target: '.tour-evaluate-prompt',
    content: (
      <>
        <p>現在のAIが問題を解決しているかを採点します</p>
      </>
    )  as React.ReactNode,
  },
  {
    target: '.tour-evaluate-prompt-point',
    content: '現在のAIの得点です。',
  },
  {
    target: '.tour-create-new-chat',
    content: '新しいAIとのチャットを新規作成します。',
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
        <p>「"私はAIロボットです"と返してください」と入力してみよう</p>
      </>
    )  as React.ReactNode,
    disableBeacon: false,
  },
  {
    target: '.tour-active-evaluation',
    content: (
      <>
        <p>AIを採点してみよう。</p>
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