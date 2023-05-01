import { ReactElement } from "react";

export interface GroupCardProps {
  id: string;
  name: string;
}

declare function GroupchatCard(props: GroupCardProps): ReactElement;

export default GroupchatCard;
