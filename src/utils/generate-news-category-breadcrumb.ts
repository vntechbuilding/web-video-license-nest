import { newsCategory, domain } from '@prisma/client';

export const generateBreadcrumbList = (
  category: newsCategory & { parent: any },
  domain: domain,
  position = 1,
  breadcrumbs = [],
) => {
  // Add the current category to the breadcrumb list
  breadcrumbs.unshift({
    '@type': 'ListItem',
    position: position,
    name: category.title,
    item:
      (domain.https ? 'https://' : 'http://') +
      domain.domain +
      '/' +
      category.url,
  });

  // If the category has a parent, add it to the breadcrumb list
  if (category.parent) {
    return generateBreadcrumbList(
      category.parent,
      domain,
      position + 1,
      breadcrumbs,
    );
  }
  // Reverse the breadcrumb list to correct the order
  // breadcrumbs.reverse();

  // Update the position values
  for (let i = 0; i < breadcrumbs.length; i++) {
    breadcrumbs[i].position = i + 1;
  }
  // Return the final breadcrumb list
  return breadcrumbs;
};
