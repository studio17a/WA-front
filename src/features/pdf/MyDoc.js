import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
const MyDoc = ({ appointment }) => {
  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      backgroundColor: "#fff",
      color: "#555",
    },
    section: {
      fontFamily: "Roboto",
      margin: 10,
      padding: 10,
    },
    viewer: {
      fontFamily: "Roboto",
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
    regular: {
      fontFamily: "Roboto",
      fontSize: 9,
      margin: 10,
      padding: 10,
    },
    bold: {
      fontFamily: "Roboto",
      fontWeight: 600,
      margin: 10,
      padding: 10,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.regular}>
            klient: {appointment.user.username}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>pojazd: {appointment.vehicle.reg}</Text>
        </View>
        <View style={styles.regular}>
          <Text style={styles.bold}>Regulamin przechowalni: </Text>
          <Text style={styles.regular}>
            a) Termin następnej wymiany lub odbioru towaru z przechowalni upływa
            z dniem 01.07.2024r.
          </Text>
          <Text style={styles.regular}>
            b) Po upływie wskazanego terminu towar zostanie przekazany do
            utylizacji na koszt Serwisu Opon Grykar bez względu na jego stan
            techniczny oraz stopień zużycia.
          </Text>
          <Text style={styles.regular}>
            c) Klient ma możliwość przedłużenia okresu składowania towaru przed
            upływem wskazanego terminu odbioru lub wymiany po uiszczeniu opłaty
            magazynowej w wysokości 120zł=4szt za każdy kolejny sezon. W
            sytuacji gdy klient odbiera towar z przechowalni i nie dokonuje
            usługi wymiany w kolejnym sezonie również jest zobowiązany do
            uiszczenia opłaty magazynowej w wysokości 120zł=4szt.
          </Text>
          <Text style={styles.regular}>
            d) Serwis nie ma obowiązku informowania klienta o zbliżającym się
            terminie utylizacji towaru.{" "}
          </Text>
          <Text style={styles.regular}>
            e) Podstawą wydania towaru z przechowalni jest oryginał niniejszej
            umowy.{" "}
          </Text>
          <Text style={styles.regular}>
            f) Serwis zapewnia przechowanie towaru w sposób gwarantujący nie
            pogorszenie jego stanu.{" "}
          </Text>
          <Text style={styles.regular}>
            g) Klient wyraża zgodę na wykorzystanie danych osobowych pobranych
            przez Grykar Grzegorz Gryka przy zawieraniu niniejszej umowy w celu
            realizacji usługi przechowania oraz sezonowej obsługi ogumienia.
            Klient ma prawo wglądu do przekazywanych danych, ich poprawiania
            oraz zgłoszenia żądania usunięcia.{" "}
          </Text>
          <Text style={styles.regular}>
            h) Klient wyraża zgodę na otrzymywanie od Grykar wiadomości sms z
            informacją o zbliżającym się terminie sezonowej wymiany opon.{" "}
          </Text>
          <Text style={styles.regular}>
            i) Klient akceptuje warunki umowy, co potwierdza własnoręcznym
            podpisem. Klauzula RODO: Zgodnie z art. 13 ust. 1 i 2 rozporządzenia
            Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
            2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
            danych osobowych i w sprawie swobodnego przepływu takich danych oraz
            uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie
            danych, dalej: RODO) informujemy, że:Zgodnie z art. 13 ust. 1 i 2
            rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia
            27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z
            przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
            takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
            rozporządzenie o ochronie danych, dalej: RODO) informujemy, że: 1.
            Administratorem Pana/Pani danych osobowych jest Grykar Grzegorz
            Gryka z siedzibą w Poznaniu przy ul.Reknickiej 1.
          </Text>
          <Text style={styles.regular}>
            {" "}
            2. W sprawach związanych z ochroną danych osobowych można
            kontaktować się z inspektorem ochrony danych, pisząc na adres e-mail
            grykagrzegorz@wp.pl lub adres siedziby.
          </Text>
          <Text style={styles.regular}>
            3. Pana/Pani dane osobowe będą przetwarzane w celu realizacji umowy
            przechowania towaru oraz sezonowej obsługi, na podstawie art.6 ust.1
          </Text>
          <Text style={styles.regular}>
            4. Odbiorcami Pana/Pani danych osobowych będą następujące podmioty:
            Grykar Grzegorz Gryka z siedzibą w Poznaniu przy ul.Reknickiej 1.
          </Text>
          <Text style={styles.regular}>
            5. Pana/Pani dane osobowe będą przechowywane przez okres do czasu
            trwania umowy przechowania oraz sezonowej obsługi.
          </Text>
          <Text style={styles.regular}>
            6. Posiada Pan/Pani prawo: a. dostępu do swoich danych osobowych, b.
            sprostowania swoich danych osobowych, c. usunięcia swoich danych
            osobowych, d. ograniczenia przetwarzania swoich danych osobowych, e.
            cofnięcia zgody na przetwarzanie danych osobowych przez pisemne
            zgłoszenie takiej woli z jednoczesnym rozwiązaniem umowy
            przechowania towaru– jeżeli uprzednio wyraził(a) Pan/Pani taką zgodę
            i przetwarzanie dotyczących Pana/Pani danych odbywa się na jej
            podstawie, f. przenoszenia swoich danych osobowych, g. wniesienia
            sprzeciwu wobec przetwarzania swoich danych osobowych z przyczyn
            związanych z Pana/Pani szczególną sytuacją, zgodnie z art. 21 RODO.
            Niezależnie od powyższego przysługuje Panu/Pani uprawnienie do
            wniesienia skargi do organu nadzorczego, tj. Prezesa Urzędu Ochrony
            Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), gdy uzna Pan/Pani,
            że przetwarzanie Pana/Pani danych osobowych narusza przepisy RODO.
          </Text>
          <Text style={styles.regular}>
            7. Podanie przez Pana/Panią danych osobowych jest warunkiem
            wynikającym z zawartej umowy oraz warunkiem zawarcia umowy. W
            przypadku niepodania przez Pana/Panią danych osobowych umowa nie
            zostanie zawarta, a usługa nie zostanie zrealizowana.
          </Text>
          <Text style={styles.regular}>
            8. Pani/Pana dane osobowe nie będą przekazywane poza terytorium
            Europejskiego Obszaru Gospodarczego/do organizacji międzynarodowej.
          </Text>
          <Text style={styles.regular}>
            9. Wyrażam zgodę na przesyłanie przez Grykar zaproszeń smsowych lub
            meilowych przypominających o terminie zbliżającej się wymiany opon
            oraz ofert handlowych.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDoc;
