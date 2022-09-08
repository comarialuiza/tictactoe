import Grid from './components/Grid/Grid';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
    return (
		<ChakraProvider>
        	<Grid />
		</ChakraProvider>
    );
}

export default App;
