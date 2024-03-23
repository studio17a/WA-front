import { HStack, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const InfoRow = () => {
  return (
    <>
      <HStack borderBottom="1px solid #ffffff">
        <Button size="sm" backgroundColor="transparent">
          <FontAwesomeIcon color="red" icon={faXmark} />
        </Button>
        <div className="infoRow">
          <p className="infoNew">zatwierdzono wizytę w dniu 21/01/2024</p>
        </div>
      </HStack>
      <HStack borderBottom="1px solid #ffffff">
        <Button size="sm" backgroundColor="transparent">
          <FontAwesomeIcon color="red" icon={faXmark} />
        </Button>
        <div className="infoRow">
          <p className="infoRed">zatwierdzono wizytę w dniu 21/01/2024</p>
        </div>
      </HStack>
      <HStack borderBottom="1px solid #ffffff">
        <Button size="sm" backgroundColor="transparent">
          <FontAwesomeIcon color="red" icon={faXmark} />
        </Button>
        <div className="infoRow">
          <p className="infoNew">zatwierdzono wizytę w dniu 21/01/2024</p>
        </div>
      </HStack>
      <HStack borderBottom="1px solid #ffffff">
        <Button size="sm" backgroundColor="transparent">
          <FontAwesomeIcon color="red" icon={faXmark} />
        </Button>
        <div className="infoRow">
          <p className="infoNew">zatwierdzono wizytę w dniu 21/01/2024</p>
        </div>
      </HStack>
      <HStack borderBottom="1px solid #ffffff">
        <Button size="sm" backgroundColor="transparent">
          <FontAwesomeIcon color="red" icon={faXmark} />
        </Button>
        <div className="infoRow">
          <p className="infoNew">zatwierdzono wizytę w dniu 21/01/2024</p>
        </div>
      </HStack>
    </>
  );
};

export default InfoRow;
