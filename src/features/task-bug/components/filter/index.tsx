import React from 'react';
import { Select, Space, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { projects } from '@config/mock-data';

const { Text } = Typography;

interface FilterState {
  project: string;
  status?: string;
  priority?: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];


const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
}) => {

  const handleFilterChange = (key: keyof FilterState, value: string | undefined) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Space align="center" size="middle">
      <Text>
        <FilterOutlined /> Filters:
      </Text>
      <Select
        value={filters.project}
        onChange={(value) => handleFilterChange('project', value)}
        style={{ minWidth: 200 }}
        placeholder="Select Project"
        allowClear
      >
        {projects.map((project) => (
          <Select.Option key={project.id} value={project.id}>
            {project.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        value={filters.status}
        onChange={(value) => handleFilterChange('status', value)}
        style={{ minWidth: 150 }}
        placeholder="Status"
        allowClear
      >
        {statusOptions.map((status) => (
          <Select.Option key={status.value} value={status.value}>
            {status.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        value={filters.priority}
        onChange={(value) => handleFilterChange('priority', value)}
        style={{ minWidth: 150 }}
        placeholder="Priority"
        allowClear
      >
        {priorityOptions.map((priority) => (
          <Select.Option key={priority.value} value={priority.value}>
            {priority.label}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default FilterBar; 