// TODO アーカイブ記事一覧画面用のパス ex.) '/archive/2023' or '/archive/2023/08'
// TODO [...slug].tsxを参考にして作成する

import Head from "next/head"

const ArchiveListPage: React.FC<{ uri: string }> = ({ uri }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href={`http://headlessnext.local/wp-includes/css/dist/block-library/style.min.css?ver=5.6`}
        />
      </Head>
    </div>
  )
}

export default ArchiveListPage
