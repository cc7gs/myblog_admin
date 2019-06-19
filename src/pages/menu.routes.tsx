import React from 'react'
import { Route } from 'react-router-dom'
import Test from './test.page'
const routes: RouteDefinition[] = require('../utilities/locales/routes.json')
interface RouteDefinition {
  path: string;
  templatePageType: string;
}

const Components: { [key: string]: React.ComponentType } = {
  Test,
}
export const MenuRoutes = () => (
  <>
    {
      routes.map((r: RouteDefinition, i: number) => (
        <Route exact key={`${i}_${r.path}`} path={r.path} component={Components[r.templatePageType]} />
      ))
    }
  </>
)