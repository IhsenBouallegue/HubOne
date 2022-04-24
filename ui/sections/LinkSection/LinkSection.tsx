import { hubOneConfig } from "../../../HubOneConfig";
import LinkGroup from "../LinkGroup";

function LinkSection() {
  return (
    <>
      {hubOneConfig.linkGroups.map((linkGroup) => (
        <LinkGroup {...linkGroup} />
      ))}
    </>
  );
}

export default LinkSection;
