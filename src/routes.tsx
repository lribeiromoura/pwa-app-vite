// Created by Vite Router https://www.npmjs.com/package/vite-plugin-router
  // @ts-nocheck
  // prettier-ignore
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const File1 = lazy(() => import('./app/forms/firstform'));
const File2 = lazy(() => import('./app/forms/secondform'));
const File3 = lazy(() => import('./app/index'));

const RootLayout = lazy(() => import('./app/layout'));

function Error404() {
  return <div>404</div>;
}

function Loading() {
  return <div>Loading...</div>;
}

interface IAppRoutesProps {
  custom404?: React.ReactNode;
  customLoading?: React.ReactNode;
}

export function AppRoutes({ custom404: Custom404, customLoading: CustomLoading }: IAppRoutesProps) {
  return (
    <BrowserRouter>
      <Suspense fallback={CustomLoading || <Loading />}>
        <Routes>
          
          <Route 
            element={
              <RootLayout>
                <File1 />
              </RootLayout>
            } 
            path="/forms/firstform" 
            key="/forms/firstform"  
          />
        
          <Route 
            element={
              <RootLayout>
                <File2 />
              </RootLayout>
            } 
            path="/forms/secondform" 
            key="/forms/secondform"  
          />
        
          <Route 
            element={
              <RootLayout>
                <File3 />
              </RootLayout>
            } 
            path="/" 
            key="/"  
          />
          <Route
            path="*"
            element={Custom404 || <Error404 />}
          />
        </Routes>
      </Suspense> 
    </BrowserRouter>
  );
}
