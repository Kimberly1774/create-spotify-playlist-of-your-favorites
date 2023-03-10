import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Avatar, Select, Tag } from 'antd';
import { StyledSelectTagMode } from './StyledSelectTagMode';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import PropTypes from 'prop-types';

const { Option } = Select;

export interface SelectOptionType {
  value: string;
  label: string;
  image?: string;
}

interface Props {
  options?: SelectOptionType[];
  values?: string[];
  defaultValue?: string;
  handleChange: Dispatch<SetStateAction<string[]>>;
}

const TagRender = (props: CustomTagProps, options: SelectOptionType[]) => {
  const { label, value, closable, onClose } = props;
  const option = options.find((gen) => gen.value === value);
  
  const onPreventMouseDown = useCallback((event: React.MouseEvent<HTMLSpanElement>) => { 
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <Tag
      style={{
        height: '36px',
        fontSize: '16px',
        alignItems: 'center',
        display: 'flex',
        margin: '2px',
        gap: '4px'
      }}
      color={'blue'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {option?.image && <Avatar size={24} src={option?.image} />}
      {label}
    </Tag>
  );
};

export const SelectTagMode = ({ options = [], handleChange, values }: Props) => {
  return (
    <StyledSelectTagMode>
      <Select
        tagRender={props => TagRender(props, options)}
        size="large"
        style={{ width: '100%'}}
        listHeight={360}
        mode="multiple"
        showSearch
        optionLabelProp="label"
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
        onChange={handleChange}
        value={values}
      >
        {options.map((opt) => {
          return (
          <Option value={opt.value} label={opt.label} key={opt.value}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {opt?.image && <Avatar size={24} src={opt?.image} />}
              {opt.label}
            </div>
          </Option>
        )})
      }
      </Select>
    </StyledSelectTagMode>
  )
}

TagRender.propTypes = {
  label: PropTypes.string
};