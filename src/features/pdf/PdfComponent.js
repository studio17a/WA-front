import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
const MyDoc = ({ appointment }) => (
  <Document>
    {/*render a single page*/}
    <Page size="A4">
      <View>
        <Text>klient: {appointment.user.username}</Text>
      </View>
      <View>
        <Text>data: {appointment.date}</Text>
        <Text>pojazd: {appointment.vehicle.reg}</Text>
      </View>
    </Page>
  </Document>
);

function PdfComponent({ appointment }) {
  return (
    <div>
      <PDFDownloadLink
        document={<MyDoc appointment={appointment} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Button isDisabled={true}>
              <FontAwesomeIcon color="#30bccf" size="xl" icon={faFilePdf} />
            </Button>
          ) : (
            <Button>
              <FontAwesomeIcon color="#30bccf" size="xl" icon={faFilePdf} />
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
export default PdfComponent;
