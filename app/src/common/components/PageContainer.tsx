import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  Card,
  Flex,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

type PageContainerProps = {
  children: React.ReactNode;
  crumbs: (BreadcrumbItemProps & {
    href: string;
    label: string;
  })[];
};

const PageContainer: React.FC<PageContainerProps> = ({ crumbs, children }) => {
  return (
    <Flex flexDirection="column">
      <Card variant="solid" p="3" mb="4">
        <Breadcrumb separator={<FiChevronRight />}>
          {crumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.href} {...crumb}>
              <BreadcrumbLink href={crumb.href} as={NavLink}>
                {crumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Card>
      <Card variant="solid">{children}</Card>
    </Flex>
  );
};

export default PageContainer;
