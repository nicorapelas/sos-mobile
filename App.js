import { Provider as UserDataProvider } from './context/UserDataContext'
import { Provider as AuthProvider } from './context/AuthContext'
import { Provider as AppProvider } from './context/AppContext'
import { Provider as NavProvider } from './context/NavContext'
import { Provider as MenuProvider } from './context/MenuContext'
import { Provider as FormProvider } from './context/FormContext'

import AppScreens from './AppScreens'

export default function App() {
  return (
    <UserDataProvider>
      <AuthProvider>
        <AppProvider>
          <NavProvider>
            <MenuProvider>
              <FormProvider>
                <AppScreens />
              </FormProvider>
            </MenuProvider>
          </NavProvider>
        </AppProvider>
      </AuthProvider>
    </UserDataProvider>
  )
}
