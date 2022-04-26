import { hubOneConfig } from "../../../HubOneConfig";
import LinkGroup from "../LinkGroup";

function LinkSection() {
  return (
    <div id="linkSection">
      {hubOneConfig.linkGroups.map((linkGroup) => (
        <LinkGroup key={`linkGroup_${linkGroup.title}`} {...linkGroup} />
      ))}
    </div>
  );
}

export default LinkSection;
