export const links = {
  employee: [
    {id: 1, path: 'browse', title: 'Browse Items' },
    {id: 2, path: 'my_orders', title: 'My Orders' }
  ],
  coordinator: [
    {id: 1, path: 'items', title: 'Items' },
    {id: 2, path: 'requests', title: 'Requests' }
  ],
  administrator: [
    {id: 1, path: 'items', title: 'Items' },
    {id: 2, path: 'requests', title: 'Requests' },
    {id: 3, path: 'users', title: 'Users' },
  ]
}

export const users = [
  { id: 3, username: 'employee1', employee_name: 'Alice Patterson', role: 'employee', avatar: '3.jpg' },
  { id: 4, username: 'employee2', employee_name: 'Mike Anderson', role: 'employee', avatar: '4.jpg'  },
  { id: 2, username: 'coordinator', employee_name: 'John Parker', role: 'coordinator', avatar: '2.jpg' },
  { id: 1, username: 'admin', employee_name: 'Chloe Ward', role: 'administrator', avatar: '1.jpg' },
]
