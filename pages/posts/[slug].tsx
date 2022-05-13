import Link from "next/link";
import { request, gql } from "graphql-request";

const gqlUrl =
  "https://api-eu-central-1.graphcms.com/v2/cl2xdfkmd2et901z3091h047x/master";
const listQuery = gql`
  query GetPosts {
    posts {
      slug
    }
  }
`;

const postQuery = gql`
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      title
      content {
        html
      }
    }
  }
`;

export async function getStaticPaths() {
  const data = await request(gqlUrl, listQuery);
  return {
    paths: data.posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const data = await request(gqlUrl, postQuery, { slug });

  return {
    props: {
      post: data.post
    }
  };
}

export default function IndexPage({ post }) {
  console.log(post.content.html);
  return (
    <div>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
}
