import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export default function DynamicSEO({
  title = 'DANVERSE - Global AI-Powered Creative Studio',
  description = 'World-class AI-powered creative studio pushing the boundaries of cinematic production, 3D experiences, and global brand storytelling.',
  image = '/og-image.jpg',
  type = 'website',
  article,
}: SEOProps) {
  const [location] = useLocation();
  const canonicalUrl = `https://danverse.ai${location}`;

  // Structured Data for Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DANVERSE',
    url: 'https://danverse.ai',
    logo: 'https://danverse.ai/brand/logo_primary_monogram_wordmark.png',
    description:
      'Global AI-powered creative studio specializing in cinematic production, 3D web experiences, and brand storytelling.',
    sameAs: [
      'https://instagram.com/danverse.ai',
      'https://twitter.com/danverse_ai',
      'https://linkedin.com/company/danverse',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@danverse.ai',
      contactType: 'Customer Service',
    },
  };

  // Structured Data for Creative Work
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: description,
    creator: {
      '@type': 'Organization',
      name: 'DANVERSE',
    },
    image: `https://danverse.ai${image}`,
    url: canonicalUrl,
  };

  // Structured Data for Article (if applicable)
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: `https://danverse.ai${image}`,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime,
        author: {
          '@type': 'Organization',
          name: article.author || 'DANVERSE',
        },
        publisher: {
          '@type': 'Organization',
          name: 'DANVERSE',
          logo: {
            '@type': 'ImageObject',
            url: 'https://danverse.ai/brand/logo_primary_monogram_wordmark.png',
          },
        },
        keywords: article.tags?.join(', '),
      }
    : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://danverse.ai${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="DANVERSE" />

      {/* Article specific OG tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://danverse.ai${image}`} />
      <meta property="twitter:site" content="@danverse_ai" />
      <meta property="twitter:creator" content="@danverse_ai" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
}
