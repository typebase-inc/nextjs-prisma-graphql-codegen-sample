import { MockedProvider } from '@apollo/client/testing'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { FC, ReactElement, ReactNode } from 'react'

import { mocks } from './mocks'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: AllTheProviders, ...options }),
})

export { customRender }
