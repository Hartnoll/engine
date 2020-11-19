package com.uob.engine;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping(value="/control_panel")
    public void controlPanel() {

    }

    @GetMapping(value="/calculations")
    public void calculations() {

    }
}
