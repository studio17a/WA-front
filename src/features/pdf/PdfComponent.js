import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import MyDoc from "./MyDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";

function PdfComponent({ appointment }) {
  return (
    <div>
      <PDFDownloadLink
        document={<MyDoc appointment={appointment} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Button bg="transparent" isDisabled={true}>
              <FontAwesomeIcon color="#30bccf" size="xl" icon={faFilePdf} />
            </Button>
          ) : (
            <Button bg="transparent">
              <FontAwesomeIcon color="#30bccf" size="xl" icon={faFilePdf} />
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
export default PdfComponent;
