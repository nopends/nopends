interface SponsorEntity {
  __typename: 'User' | 'Organization';
  login: string;
  name: string;
  avatarUrl: string;
  websiteUrl?: string;
}

const mockSponsors: SponsorEntity[] = [
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
  try {
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

    if (!res.ok) {
      console.warn(`Failed to fetch sponsors: ${await res.text()}`);
      return mockSponsors;
    }

    const { data } = (await res.json()) as {
      data: {
        user: {
          sponsors: {
            nodes: (SponsorEntity | Record<string, never>)[];
          };
        };
      };
    };

    if (!data?.user?.sponsors?.nodes) {
      console.warn('Invalid response structure from GitHub API');
      return mockSponsors;
    }

    const validSponsors = data.user.sponsors.nodes.filter(
      (sponsor): sponsor is SponsorEntity =>
        'name' in sponsor &&
        'login' in sponsor &&
        'avatarUrl' in sponsor &&
        '__typename' in sponsor &&
        (sponsor.__typename === 'User' || sponsor.__typename === 'Organization') &&
        !excluded.includes(sponsor.login),
    );

    return validSponsors.length > 0 ? validSponsors : mockSponsors;
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return mockSponsors;
  }
}
