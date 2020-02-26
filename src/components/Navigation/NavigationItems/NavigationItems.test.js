import React from 'react'
import NavigationItems from './NavigationItems'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NavigationItems>', () => {
	it('should render two navigationItems if the user is not authenticated', () => {
		const wrapper = shallow(<NavigationItems />)
		expect(wrapper.find(NavigationItem)).toHaveLength(2)
	})
})
