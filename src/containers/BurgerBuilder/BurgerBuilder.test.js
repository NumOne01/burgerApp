import React from 'react'
import { BurgerBuilder } from './BurgerBuilder'
import { configure, shallow } from 'enzyme'
import Adapater from 'enzyme-adapter-react-16'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'

configure({ adapter: new Adapater() })

describe('<BurgerBuilder />', () => {
	let wrapper
	beforeEach(() => (wrapper = shallow(<BurgerBuilder onInit={() => {}} />)))
	it('should render <BuildControls> if ings is exist', () => {
		wrapper.setProps({ ingredients: { salad: 0 } })
		expect(wrapper.find(BurgerControls)).toHaveLength(1)
    })
    
	it('should not render <BuildControls> if ings dont exist', () => {
		expect(wrapper.find(BurgerControls)).toHaveLength(0)
	})
})
