import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import ServiceDetails from "../ServiceDetails";
import ItemsTable from "../../items/ItemsTable";

const ServiceInfoRow = ({ service }) => {
  return (
    <>
      <Tr>
        <Td>{service.status}</Td>
        <Td>
          {service.st.length > 0 ? (
            service.st?.map((s, index) => (
              <ServiceDetails key={index} index={index} st={s} />
            ))
          ) : (
            <>dodaj usługę</>
          )}
        </Td>
        <Td>
          <ItemsTable itemsRaw={[]} view="raw" />
        </Td>
        <Td>{service.note}</Td>
        <Td>{service.date}</Td>
      </Tr>
    </>
  );
};

export default ServiceInfoRow;
