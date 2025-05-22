interface SponsorEntity {
  __typename: 'User' | 'Organization';
  login: string;
  name: string;
  avatarUrl: string;
  websiteUrl?: string;
}

const mockSponsors = [
  {
    __typename: 'User',
    login: 'fuma-nama',
    name: 'Fumadocs',
    avatarUrl: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    websiteUrl: 'https://fumadocs.com',
  },
  {
    __typename: 'Organization',
    login: 'Microsoft',
    name: 'Microsoft',
    avatarUrl: 'https://avatars.githubusercontent.com/u/123456789?v=4',
  },
];

export async function getSponsors(
  login: string,
  excluded: string[],
): Promise<SponsorEntity[]> {
  const query = `query {
  user(login:${JSON.stringify(login)}) {
    ... on Sponsorable {
      sponsors(first: 100) {
        nodes {
          __typename
          ... on User { login, name, avatarUrl, websiteUrl }
          ... on Organization { login, name, avatarUrl, websiteUrl }
        }
      }
    }
  }
}`;
  const headers = new Headers();
  if (process.env.GITHUB_TOKEN)
    headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
  else
    console.warn(
      'Highly suggested to add a `GITHUB_TOKEN` environment variable to avoid rate limits.',
    );

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers,
    next: { revalidate: 3600 },
  });
  // if (!res.ok) throw new Error(`Failed to fetch sponsors: ${await res.text()}`);
  if (!res.ok) return mockSponsors as SponsorEntity[]

  const { data } = (await res.json()) as {
    data: {
      user: {
        sponsors: {
          nodes: (SponsorEntity | Record<string, never>)[];
        };
      };
    };
  };

  return data.user.sponsors.nodes.filter(
    (sponsor) => 'name' in sponsor && !excluded.includes(sponsor.login),
  ) as SponsorEntity[];
}
