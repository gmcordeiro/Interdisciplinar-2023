import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  Card,
  Flex,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaPlus, FaRedo } from "react-icons/fa";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

type PageContainerProps = {
  children: React.ReactNode;
  crumbs: (BreadcrumbItemProps & {
    href: string;
    label: string;
  })[];
  onCreate?: () => void;
  onRefresh?: () => void;
  onBack?: () => void;
};

const PageContainer: React.FC<PageContainerProps> = ({
  crumbs,
  children,
  onCreate,
  onRefresh,
  onBack,
}) => {
  return (
    <Flex flexDirection="column">
      <Card
        variant="solid"
        p="3"
        mb="4"
        as={Flex}
        direction="row"
        alignItems="center"
      >
        <Breadcrumb separator={<FiChevronRight />}>
          {crumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.href} {...crumb}>
              <BreadcrumbLink to={crumb.href} as={NavLink}>
                {crumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <HStack ml="auto">
          {onRefresh && (
            <IconButton
              aria-label="Refresh"
              icon={<FaRedo />}
              variant="ghost"
              size="sm"
              rounded="full"
              onClick={onRefresh}
            />
          )}
          {onCreate && (
            <IconButton
              aria-label="Create"
              icon={<FaPlus />}
              size="sm"
              rounded="full"
              colorScheme="blue"
              onClick={onCreate}
            />
          )}
          {onBack && (
            <IconButton
              aria-label="Back"
              icon={<FiArrowLeft />}
              variant="ghost"
              size="sm"
              rounded="full"
              onClick={onBack}
            />
          )}
        </HStack>
      </Card>
      <Card variant="solid">{children}</Card>
    </Flex>
  );
};

export default PageContainer;
