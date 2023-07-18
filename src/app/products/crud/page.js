'use client'

// Import libraries and services
import React, { useState, useEffect } from 'react'
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Select,
  Button,
  Modal,
} from 'antd'
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from '../../../services/products'

// Editable Cell Component
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  categories,
  ...restProps
}) => {
  let inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  if (dataIndex === 'category') {
    inputNode = (
      <Select>
        {categories.map((category) => (
          <Select.Option key={category} value={category}>
            {category}
          </Select.Option>
        ))}
      </Select>
    )
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Porfavor introduce ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default function Page() {
  // State initialization
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })
  const [searchText, setSearchText] = useState('')
  const [categories, setCategories] = useState([])

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error('A habido un problema con tu operacion de fetch:', error)
    }
  }

  // Modal handler functions
  const showModal = () => setIsModalVisible(true)

  const handleOk = async () => {
    try {
      const productWithId = await addProduct(newProduct)
      setDataSource([...dataSource, productWithId])
      setNewProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      })
      setIsModalVisible(false)
    } catch (error) {
      console.error('Error al añadir el producto:', error)
    }
  }

  const handleCancel = () => setIsModalVisible(false)

  const handleInputChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })

  // Search handler
  const handleSearch = (event) =>
    setSearchText(event.target.value.toLowerCase())

  // Check if editing is enabled
  const isEditing = (record) => record.id === editingKey

  // Filtered Data based on Search Text
  const filteredData = dataSource.filter((item) =>
    item.title.toLowerCase().includes(searchText)
  )

  // Fetch Inventory from API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getProducts()
        setDataSource(data)
      } catch (error) {
        console.error('A habido un problema con tu operacion de fetch:', error)
      }
    }
    fetchInventory()
    fetchCategories()
  }, [])

  const edit = (record) => {
    form.setFieldsValue({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      ...record,
    })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (id) => {
    try {
      const row = await form.validateFields() // Here we get the updated field values.
      const updatedProduct = await updateProduct({ ...row, id }) // Pass the updated product to your API function.
      const newDataSource = [...dataSource]
      const index = dataSource.findIndex((item) => item.id === id)
      if (index > -1) {
        newDataSource.splice(index, 1, updatedProduct)
        setDataSource(newDataSource)
      }
      setEditingKey('')
    } catch (error) {
      console.error('Error actualizando el producto:', error)
    }
  }

  const handleDelete = async (id, index) => {
    try {
      await deleteProduct(id)
      const newDataSource = [...dataSource]
      newDataSource.splice(index, 1)
      setDataSource(newDataSource)
    } catch (error) {
      console.error('Error eliminando el producto:', error)
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
      editable: true,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      editable: true,
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      editable: true,
    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      editable: true,
    },

    {
      title: 'Operaciones',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)} // Pass the id to your save function.
              style={{ marginRight: 8 }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm
              title='¿Seguro que quieres cancelar?'
              okType='default'
              okText='Si'
              cancelText='No'
              onConfirm={cancel}
            >
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => {
                console.log(record)
                edit(record)
              }}
            >
              Editar
            </Typography.Link>
            <Popconfirm
              title='¿Seguro que quieres borrarlo?'
              okType='default'
              okText='Si'
              cancelText='No'
              onConfirm={() => handleDelete(record.id)}
            >
              <a className='ml-2 text-red-500 hover:text-red-300'>Borrar</a>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'price' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        categories, // pass this down to EditableCell
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <div className='flex flex-row-reverse'>
        <Input
          placeholder='Buscar...'
          onChange={handleSearch}
          className='m-4 w-48 h-8'
        />

        <Button
          onClick={showModal}
          className='m-4 font-semibold border-black text-black'
        >
          Agregar producto
        </Button>
      </div>

      <Modal
        title='Agregar producto'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout='vertical'>
          <Form.Item label='Título'>
            <Input name='title' onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label='Precio'>
            <InputNumber
              name='price'
              onChange={(value) =>
                setNewProduct({ ...newProduct, price: value })
              }
            />
          </Form.Item>
          <Form.Item label='Descripción'>
            <Input name='description' onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label='Categoría'>
            <Select
              name='category'
              onChange={(value) =>
                setNewProduct({ ...newProduct, category: value })
              }
            >
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Imagen'>
            <Input name='image' onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={filteredData}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}
