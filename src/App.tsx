

import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
type Props = {}

export default function App({}: Props) {
  return (

     <AuthProvider>
        <AppRoutes/>
     </AuthProvider>

  )
}