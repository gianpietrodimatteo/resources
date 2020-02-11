public interface EmployeeRepository extends CrudRepository<Employee, Long> {

  @Query("SELECT e FROM Employee e WHERE e.name LIKE ?1")
  public List<Employee> findByName(String name);

  @Query("SELECT e FROM Employee e WHERE e.name LIKE %?1%")
  public List<Employee> findByName2(String name);

  public List<Employee> findByNameContaining(String name);
}
