import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

global.___loader = {
      enqueue: jest.fn(),
}

global.graphql = jest.fn()
