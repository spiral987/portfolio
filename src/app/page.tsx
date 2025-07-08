// src/app/page.tsx

// 必要なユースケースとリポジトリをインポート
// Next.jsのServer Componentsから直接ユースケースを呼び出します
import { GetFeaturedProjectsUseCase } from '@/use-cases/project/getFeaturedProjectsUseCase';
import { GetLatestBlogPostsUseCase } from '@/use-cases/blogPost/getLatestBlogPostsUseCase';
import { InMemoryProjectRepository } from '@/infrastructure/repositories/in-memory/inMemoryProjectRepository';
import { InMemoryBlogPostRepository } from '@/infrastructure/repositories/in-memory/inMemoryBlogPostRepository';

// ドメイン層のエンティティとバリューオブジェクト
import { Project } from '@/domain/entities/project';
import { BlogPost } from '@/domain/entities/blogPost';
import { CONTACT_INFO } from '@/lib/constants'; // 連絡先情報（定数として定義した場合）

// UI表示用のコンポーネントを想定（今は直接ここに記述しますが、後で分割します）

// トップページに表示する作品カードコンポーネント (簡易版)
const ProjectCard = ({ project }: { project: Project }) => (
  <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
    <h3 style={{ margin: '0 0 8px 0' }}>{project.title}</h3>
    {project.images.length > 0 && (
      <img
        src={project.images[0].url.value}
        alt={project.images[0].altText}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
    )}
    <p style={{ fontSize: '0.9em', color: '#666' }}>{project.description}</p>
    <div style={{ marginTop: '10px' }}>
      {project.projectUrl && (
        <a href={project.projectUrl.value} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
          プロジェクトを見る
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl.value} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      )}
    </div>
  </div>
);

// トップページに表示するブログ記事カードコンポーネント (簡易版)
const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
    <h3 style={{ margin: '0 0 8px 0' }}>{post.title}</h3>
    <p style={{ fontSize: '0.85em', color: '#666' }}>
      {post.content.substring(0, 100)}... {/* 記事の冒頭のみ表示 */}
    </p>
    <p style={{ fontSize: '0.75em', color: '#999', textAlign: 'right' }}>
      {post.publishedAt.toLocaleDateString()}
    </p>
    <a href={`/blog/${post.slug.value}`} style={{ display: 'block', textAlign: 'right', marginTop: '10px' }}>
      続きを読む
    </a>
  </div>
);


export default async function HomePage() {
  // ★ Next.jsのServer Componentsの利点を活かし、直接データをフェッチ
  // ここでインメモリリポジトリのインスタンスを作成
  const projectRepository = new InMemoryProjectRepository();
  const blogPostRepository = new InMemoryBlogPostRepository();

  // ユースケースのインスタンスを作成し、リポジトリを注入
  const getFeaturedProjectsUseCase = new GetFeaturedProjectsUseCase(projectRepository);
  const getLatestBlogPostsUseCase = new GetLatestBlogPostsUseCase(blogPostRepository);

  // ユースケースを実行してデータを取得
  const featuredProjects = await getFeaturedProjectsUseCase.execute();
  const latestBlogPosts = await getLatestBlogPostsUseCase.execute();

  // 自己紹介のデータ (今はここに直接記述、後で別のファイルにまとめることも可能)
  const name = "あなたの名前";
  const bio = "こんにちは！私は[あなたの専門分野、例：Web開発者/イラストレーター]です。このポートフォリオサイトでは、私の[例：Webアプリケーション開発、デジタルイラストレーション]のスキルと情熱を表現した作品を紹介しています。新しい技術を学ぶこと、そして創造的な解決策を見つけることに喜びを感じています。ご興味を持っていただけたら、ぜひお問い合わせください！";


  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      {/* 自己紹介セクション */}
      <section style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>{name}のポートフォリオ</h1>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>{bio}</p>
        <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#888' }}>
          メール: <a href={`mailto:${CONTACT_INFO.email.value}`}>{CONTACT_INFO.email.value}</a>
        </p>
        {CONTACT_INFO.githubUrl && (
          <p style={{ fontSize: '0.9em', color: '#888' }}>
            GitHub: <a href={CONTACT_INFO.githubUrl.value} target="_blank" rel="noopener noreferrer">{CONTACT_INFO.githubUrl.value}</a>
          </p>
        )}
      </section>

      {/* 注目作品セクション */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>注目作品</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p>まだ注目作品はありません。</p>
          )}
        </div>
      </section>

      {/* 最新ブログ記事セクション */}
      <section>
        <h2 style={{ fontSize: '2em', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>最新のつぶやき</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {latestBlogPosts.length > 0 ? (
            latestBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <p>まだブログ記事はありません。</p>
          )}
        </div>
      </section>
    </div>
  );
}