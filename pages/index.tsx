import Link from "next/link";
import { request, gql } from "graphql-request";

const gqlUrl =
  "https://api-eu-central-1.graphcms.com/v2/cl2xdfkmd2et901z3091h047x/master";
const query = gql`
  query {
    posts {
      title
      slug
      excerpt
    }
  }
`;

export async function getStaticProps() {
  const data = await request(gqlUrl, query);

  return {
    props: {
      posts: data.posts
    }
  };
}

export default function IndexPage({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
