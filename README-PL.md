# RUMI 30.0 — Android English Tutor

Projekt aplikacji Android dla początkującej uczennicy w wieku 8 lat. Interfejs działa lokalnie w WebView, lekcje i postępy są przechowywane na urządzeniu. Postać 3D jest renderowana w Three.js.

## Ważne ograniczenia\n\n- APK nie jest dołączony do tego archiwum; kompilacja wymaga Android SDK i Gradle (workflow GitHub Actions buduje debug APK).\n- Rozmowa AI wymaga wdrożonego serwera z kluczem API; klucz nie jest przechowywany w aplikacji.\n- Postać 3D korzysta z Three.js ładowanego z CDN, więc jej renderowanie wymaga internetu; pozostałe zasoby aplikacji są buforowane po pierwszym uruchomieniu.\n\n## Nowości w 30.0\n\n- **Smart Coach:** automatyczny dobór następnej misji na podstawie ukończeń.\n- **Sesje skupienia:** 5, 8 lub 10 minut, pauza i reset; ukończone sesje są liczone lokalnie.\n- **Tryb offline:** cache aplikacji i lekcji po pierwszym uruchomieniu online. Model 3D z CDN wymaga internetu.\n\n## Nowości w 21.0

- **Kopia bezpieczeństwa postępów:** eksport JSON i przywracanie z walidacją formatu, znanych misji i słówek.
- **Prywatność kopii:** PIN rodzica, adres serwera AI i historia rozmów nie trafiają do pliku kopii.
- **Ochrona przy przywracaniu:** limit wielkości pliku, kontrola schematu i potwierdzenie zastąpienia bieżących postępów.
- **Cel powtórek:** rodzic wybiera 3, 5, 7 lub 10 kart dziennie.
- **Testy automatyczne:** walidacja kopii, odrzucanie błędnych danych i sprawdzanie wykluczenia sekretów.

## Nowości w 20.0

- **20 misji językowych:** od kolorów i zwierząt po zdania, sport, miasto i przyimki; łącznie 120 kart słownictwa.
- **Akademia adaptacyjna:** poziomy uczennicy, punkty XP i pasek postępu.
- **Wyzwanie dnia:** jedno krótkie zadanie dziennie, nagroda XP i gwiazdki.
- **Rumi Arcade:** pięciopytaniowy szybki quiz z losowaniem słówek.
- **Sentence Studio:** układanie prostych zdań z rozsypanych słów i odczyt TTS.
- **Odznaki:** osiągnięcia za misje, słownictwo, powtórki i regularną naukę.
- **Raport rodzica:** poziom, XP, odznaki i liczba misji.
- **Migracja postępów:** RUMI 21 odczytuje wcześniejsze zapisy `rumi50` / `rumi30` i zapisuje nowy stan pod `rumi20`.

## Nowości odziedziczone z 5.0

- **System powtórek rozłożonych w czasie (SRS):** słówka z ukończonych misji trafiają do kolejki powtórek; dziecko ocenia, czy pamięta odpowiedź („Jeszcze raz”, „Trudne”, „Umiem!”), a aplikacja ustala kolejny termin.
- **Codzienna sesja pamięci:** przycisk „Trening pamięci” wybiera do 5 słówek, które wymagają powtórzenia.
- **Nagrody za naukę:** gwiazdki za poprawne powtórki i ukończenie sesji.
- **Rozszerzony panel rodzica:** liczba poznanych słówek i wykonanych powtórek, eksport danych obejmujący harmonogram SRS.
- **Migracja danych:** aplikacja odczytuje dotychczasowy zapis RUMI 4/5 (`rumi30` / `rumi50`) i zapisuje kolejne zmiany w formacie (`rumi20`).

## Funkcje aplikacji

- Android app (Java, Android Gradle Plugin 8.7.3, compile/target SDK 35, min SDK 23).
- 20 zestawów słownictwa Pre-A1/A1, quizy, gry, gwiazdki i postępy.
- Proceduralny awatar 3D Rumi, animacje idle/wave/celebrate/talk.
- Synteza mowy Android/WebView i opcjonalne rozpoznawanie mowy.
- Panel rodzica: PIN, eksport/reset postępów, konfiguracja endpointu AI i test zdrowia serwera.
- Opcjonalny backend Node.js z moderacją wejścia, limitowaniem zapytań, promptem dziecięcego korepetytora i wywołaniem OpenAI Responses API.
- Klucz API pozostaje na backendzie; aplikacja Android nigdy go nie przechowuje.

## Ważne rozróżnienie

Bez podłączenia i wdrożenia backendu Rumi działa w lokalnym trybie ćwiczeń scenariuszowych. Po wdrożeniu backendu i skonfigurowaniu jego adresu w Panelu rodzica rozmowa może korzystać z modelu AI. Backend nie jest hostowany automatycznie przez ten projekt i wymaga własnego hostingu oraz klucza API.

Awatar jest animowaną postacią proceduralną Three.js, a nie filmowej jakości modelem 3D z profesjonalnym riggingiem. Biblioteka Three.js jest ładowana z jsDelivr przez import map, więc ekran postaci wymaga internetu. Nie dołączono jeszcze profesjonalnego modelu VRM/GLB ani pełnego lip-sync fonemowego.

## Budowanie APK

1. Otwórz folder `RUMI-Android` w Android Studio.
2. Zainstaluj Android SDK 35.
3. Uruchom **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
4. APK debug: `app/build/outputs/apk/debug/app-debug.apk`.

GitHub Actions workflow `.github/workflows/android.yml` buduje debug APK po uruchomieniu workflow ręcznie lub po pushu do `main`.

## Uruchomienie backendu AI

Wymagany Node.js 20+.

```bash
cd server
cp .env.example .env
# Ustaw OPENAI_API_KEY na serwerze (nie w aplikacji Android).
node server.js
```

Backend używa `POST https://api.openai.com/v1/moderations` do kontroli wejścia oraz `POST https://api.openai.com/v1/responses` do odpowiedzi. Ustaw `OPENAI_MODEL` na model dostępny na Twoim koncie API. Ustaw `ALLOWED_ORIGIN` zgodnie z wdrożeniem. W środowisku produkcyjnym dodaj TLS/HTTPS, reverse proxy, trwałe limity i monitoring.

Po wdrożeniu serwera wpisz jego bazowy adres HTTPS w Panelu rodzica → Adres bezpiecznego serwera AI → Zapisz serwer AI → Sprawdź połączenie.

## Prywatność i bezpieczeństwo

- Rozmowy nie są zapisywane w localStorage; historia rozmowy istnieje tylko w pamięci bieżącej sesji.
- W trybie AI tekst ostatnich wiadomości jest wysyłany do skonfigurowanego serwera i dalej do dostawcy modelu; backend używa `store: false`.
- Mikrofon jest opcjonalny; aplikacja nie wysyła surowych nagrań do backendu.
- Używaj aplikacji pod nadzorem rodzica. PIN `1234` jest domyślny i należy go zmienić.
- To nie jest certyfikowany produkt bezpieczeństwa dla dzieci; moderacja i instrukcje modelu zmniejszają ryzyko, ale nie gwarantują bezbłędnej ochrony.

## Testy wykonane lokalnie w tej iteracji

- `node --check` dla `app.js`, `rumi20.js`, `rumi21.js`, `avatar3d.js` i `server.js`.
- `node --test tests/rumi21.test.cjs` — 3 testy kopii zapasowej zakończone powodzeniem.
- Kontrola statyczna: 20 misji, 120 kart słownictwa, wyzwanie dnia, quiz, Sentence Studio i odznaki.
- Kontrola archiwum ZIP po spakowaniu.
- APK nie zostało zbudowane w tym środowisku: wymaga Android SDK i Gradle; workflow GitHub Actions jest przygotowany do zbudowania debug APK.
