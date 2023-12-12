import { VStack, HStack, Button } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <VStack w='100vw' >
        <HStack w='full' >
            <Link to='/'>
            <Button variant='text'>Home</Button>
            </Link>
            <Link to='/demo'>
            <Button variant='text'>Demo</Button>
            </Link>
        </HStack>
      <Outlet />
    </VStack>
  )
}

export default Layout