/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const run = async () => {
  // Hub
  if ((await prisma.hub.count()) === 0) {
    await prisma.hub.createMany({
      data: [
        {
          hubName: "Company",
          hubLogo: "",
          hubPath: "",
        },
        {
          hubName: "Sub Hub",
          hubLogo: "",
          hubPath: "subhub",
          primaryColor: "#26d46c",
          secondaryColor: "#00d9ff",
        },
      ],
    });
  } else {
    console.log("Default hubs already created");
  }
  // Link Groups
  if ((await prisma.linkGroup.count()) === 0) {
    await prisma.linkGroup.createMany({
      data: [
        {
          title: "Link Group 1",
          hubId: 1,
        },
        {
          title: "Link Group 2",
          hubId: 1,
        },
      ],
    });
  } else {
    console.log("Default linkGroups already created");
  }
  // Links
  if ((await prisma.link.count()) === 0) {
    await prisma.link.createMany({
      data: [
        {
          title: "1. Website",
          description: "Description",
          image: undefined,
          link: "",
          isInternal: true,
          linkGroupId: 1,
          hubId: 1,
        },
        {
          title: "2. Website",
          description: "Description",
          image: undefined,
          link: "",
          isInternal: true,
          linkGroupId: 1,
          hubId: 1,
        },
        {
          title: "3. Website",
          description: "Description",
          image: undefined,
          link: "",
          linkGroupId: 1,
          hubId: 1,
        },
        {
          title: "4. Website",
          description: "Description",
          image: undefined,
          link: "",
          isInternal: true,
          linkGroupId: 2,
          hubId: 1,
        },
        {
          title: "5. Website",
          description: "Description",
          image: undefined,
          link: "",
          linkGroupId: 2,
          hubId: 1,
        },
      ],
    });
  } else {
    console.log("Default links already created");
  }
  // FooterLinks
  if ((await prisma.footerLink.count()) === 0) {
    await prisma.footerLink.createMany({
      data: [
        {
          title: "Website",
          link: "/",
          hubId: 1,
        },
        {
          title: "About",
          link: "/",
          hubId: 1,
        },
        {
          title: "Contact",
          link: "/",
          hubId: 1,
        },
      ],
    });
  } else {
    console.log("Default footerLinks already created");
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
