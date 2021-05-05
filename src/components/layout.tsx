import React, { FunctionComponent, ReactNode, useState } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';
//import { useAuth } from "src/auth/useAuth";

interface layoutProps {
  main: ReactNode;
}

export const Layout: React.FC<layoutProps> = ({ main }): JSX.Element => {
  const { authenticated, user, logout } = useAuth();

  return (
    <div className='bg-gray-900 max-w-screen-2xl mx-auto text-white'>
      <nav className='bg-gray-800' style={{ height: '64px' }}>
        <div className='px-6 flex items-center justify-between h-16'>
          <Link href='/'>
            <a>
              <img src='/home-color.svg' alt='home house' className='inline w-6' />
            </a>
          </Link>
          {authenticated ? (
            <React.Fragment>
              <Link href='/houses/add'>
                <a>Agregar Casa</a>
              </Link>
              <button onClick={logout}>Salir</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link href='/auth'>
                <a>Login / Registro</a>
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>{main}</main>
    </div>
  );
};
