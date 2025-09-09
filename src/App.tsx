import ServiceContainerProvider from 'context/ServiceContainerContext';
import { ThemeProvider } from 'context/ThemeContext';
import { AppRouter } from 'presentation/components/AppRouter/AppRouter';
import { ViewportManager } from 'presentation/components/ViewportManager/ViewportManager';
import { I18nextProvider } from 'react-i18next';
import i18n from 'translations/i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <ServiceContainerProvider>
          <ViewportManager>
            <AppRouter />
          </ViewportManager>
        </ServiceContainerProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
