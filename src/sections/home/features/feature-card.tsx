// import { Card, Text, useMantineTheme } from "@mantine/core";
// import { Icon as IconType } from "@tabler/icons-react";

// export function FeatureCard({
//   title,
//   description,
//   Icon,
// }: {
//   title: string;
//   description: string;
//   Icon: IconType;
// }) {
//   const theme = useMantineTheme();
//   return (
//     <Card
//       shadow="lg"
//       radius="lg"
//       style={{ border: `1px solid ${theme.colors.gray[1]}` }}
//       p="xl"
//     >
//       <Icon size={50} stroke={2} color={theme.colors.primary[4]} />
//       <Text
//         size="lg"
//         sx={{
//           "&::after": {
//             content: '""',
//             display: "block",
//             backgroundColor: theme.colors.primary[4],
//             width: 45,
//             height: 2,
//             marginTop: theme.spacing.sm,
//           },
//         }}
//         mt="md"
//       >
//         {title}
//       </Text>
//       <Text size="sm" c="dimmed" mt="sm">
//         {description}
//       </Text>
//     </Card>
//   );
// }
