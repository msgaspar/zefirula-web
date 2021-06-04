import { useState } from 'react';
import { Flex, Stack, Image, Box } from '@chakra-ui/react';
import Head from 'next/head';
import LoginForm from '../components/Form/LoginForm';

export default function Home() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const handleLogoImageLoad = () => {
    setLogoLoaded(true);
  };

  const handleBgImageLoad = () => {
    setBgLoaded(true);
  };

  return (
    <>
      <Head>
        <title>Zé Firula</title>
      </Head>
      <Flex
        style={{ display: logoLoaded && bgLoaded ? 'flex' : 'none' }}
        position="relative"
        w="100vw"
        minHeight="100%"
        direction="column"
        align="center"
        boxShadow="inset 0 0 30px 30px #000"
      >
        <Image
          position="absolute"
          top="0"
          left="0"
          height="100%"
          width="100%"
          src="/images/bg3_optimized.jpg"
          fit="cover"
          objectPosition="bottom"
          filter="blur(2px) sepia(30%)"
          onLoad={handleBgImageLoad}
        ></Image>
        <Box flex="2" />

        <Stack
          position="relative"
          align="center"
          opacity="100%"
          spacing="8"
          m="2"
          bg={'white'}
          width={['300px', '340px']}
          py="8"
          px={{ base: '4', md: '10' }}
          boxShadow="0 50px 100px 0 rgba(0, 0, 0, 0.7)"
          rounded={{ sm: 'lg' }}
        >
          <Box w={[140]} mx="auto">
            <Image
              src="/images/logo_optimized.png"
              alt="Logo"
              onLoad={handleLogoImageLoad}
            />
          </Box>

          <LoginForm />
        </Stack>

        <Box flex="3" />
      </Flex>
    </>
  );
}
