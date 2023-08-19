import { OrganizationProfile } from "@clerk/nextjs";

function MyApp() {
  return (
    <div
      style={{
        display: "flex",

        flexDirection: "column",

        gap: "2rem",

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <OrganizationProfile />
    </div>
  );
}

export default MyApp;
