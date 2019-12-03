package org.codice.ddf.attribute.enumerations;

import static org.codice.jsonrpc.JsonRpc.INVALID_PARAMS;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableMap.Builder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.codice.ddf.catalog.ui.enumeration.ExperimentalEnumerationExtractor;
import org.codice.jsonrpc.DocMethod;
import org.codice.jsonrpc.Error;
import org.codice.jsonrpc.MethodSet;

public class EnumerationMethods implements MethodSet {

  private final Map<String, DocMethod> METHODS;

  {
    Builder<String, DocMethod> builder = ImmutableMap.builder();
    builder.put(
        "ddf.enumerations/by-type",
        new DocMethod(
            this::getEnumsByType,
            "Takes the specified parameters and calls ExperimentalEnumerationExtractor::getEnumerations as many times"
                + "as necessary. `params` takes: `types(Required, value:List(String))`"));
    METHODS = builder.build();
  }

  @Override
  public Map<String, DocMethod> getMethods() {
    return METHODS;
  }

  private final ExperimentalEnumerationExtractor enumerationExtractor;

  public EnumerationMethods(ExperimentalEnumerationExtractor enumerationExtractor) {
    this.enumerationExtractor = enumerationExtractor;
  }

  private Object getEnumsByType(Map<String, Object> params) {
    Object types = params.get("types");
    if (!(types instanceof List)) {
      return new Error(INVALID_PARAMS, "invalid types param");
    }
    Map<String, Set<String>> enumerations = new HashMap<>();
    for (String type : (List<String>) types) {
      Map<String, Set<String>> typeEnumerations = enumerationExtractor.getEnumerations(type);
      for (String attribute : typeEnumerations.keySet()) {
        enumerations.put(attribute, typeEnumerations.get(attribute));
      }
    }
    return ImmutableMap.of("enumerations", enumerations);
  }
}
